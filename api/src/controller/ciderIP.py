"""
"""

from models.IPRangeInfo import IPRangeInfo
from models.CustomExceptions import *


def calculateIPRange(ip: str, ciderrange: int):
    if not ip:
        raise NullArgumentException(message='ip cannot be null or empty')
    if not ciderrange or ciderrange < 0:
        raise BadArgumentExcepton(message=f'cidr range cannot be null or {ciderrange}')
    if ciderrange > 32:
        raise BadArgumentExcepton(message='cidr range cannot exceed 32')
    return __calculateIPCIDRRange(ip, ciderrange)


def calculateCiderIPRange():
    return 'Cider IP Range'


def __convertIPToBinary(ipAddress):
    ipBinary = []
    ip = [int(x) for x in ipAddress.split('.')]
    # Binary format of the IP
    for ipSec in ip:
        binaryIPSection = format(ipSec, '08b')
        ipBinary.append(binaryIPSection)
    ipBinaryMerged = "".join(ipBinary)
    return ipBinaryMerged


def __convertBinaryToIP(ipBinaryString):
    binaryOctet = __convertStringBinaryToOctet(ipBinaryString)
    ipAddress = __convertBinaryToInt(binaryOctet)
    return ipAddress


def __convertStringBinaryToOctet(ipBinaryString):
    firstOctet = ipBinaryString[0:8]
    secondOctet = ipBinaryString[8:16]
    thirdOctet = ipBinaryString[16:24]
    fourthOctet = ipBinaryString[24:32]
    return (firstOctet, secondOctet, thirdOctet, fourthOctet)


def __convertBinaryToInt(binaryOctetList):
    ipList = []
    for octet in binaryOctetList:
        ip = int(octet, 2)
        ipList.append(ip)
    return ipList


def __extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange):
    totalBits = 32
    hostIPRange = -1 * (totalBits - cidrRange)
    networkIPPart = ipBinaryMerged[:cidrRange]
    hostIPPart = ipBinaryMerged[hostIPRange:]
    return (networkIPPart, hostIPPart)


def __zeroToOnes(ipBinary):
    newIPBinary = ''
    for ipBin in ipBinary:
        if (ipBin == '0'):
            ipBin = '1'
        newIPBinary += ipBin
    return newIPBinary


def __OnesToZero(ipBinary):
    newIPBinary = ''
    for ipBin in ipBinary:
        if (ipBin == '1'):
            ipBin = '0'
        newIPBinary += ipBin
    return newIPBinary


def __extractSubnetMask(ipBinaryMerged, cidrRange):
    subnetMaskIPBinary = ''
    ipParts = __extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
    networkIPPart = ipParts[0]
    hostIPPart = ipParts[1]
    newNetworkIP = __zeroToOnes(networkIPPart)
    subnetMaskIPBinary = newNetworkIP + hostIPPart
    subnetMask = __convertBinaryToIP(subnetMaskIPBinary)
    return ".".join(map(str, subnetMask))


def __extractNetworkAddress(ipBinaryMerged, cidrRange):
    ipParts = __extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
    newHostIP = ''
    networkIPPart = ipParts[0]
    hostIPPart = ipParts[1]
    newHostIP = __OnesToZero(hostIPPart)
    networkAddressBinary = networkIPPart + newHostIP
    networkAddress = __convertBinaryToIP(networkAddressBinary)
    return ".".join(map(str, networkAddress))


def __extractBroadcastAddress(ipBinaryMerged, cidrRange):
    ipParts = __extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
    newHostIP = ''
    networkIPPart = ipParts[0]
    hostIPPart = ipParts[1]
    for ipBin in hostIPPart:
        if (ipBin == '0'):
            ipBin = '1'
        newHostIP += ipBin
    broadcastAddressBinary = networkIPPart + newHostIP
    broadcastAddress = __convertBinaryToIP(broadcastAddressBinary)
    return ".".join(map(str, broadcastAddress))


def __calculateIPCIDRRange(ipAddress, cidrRange):
    totalBits = 32
    hostIPRange = totalBits - cidrRange
    totalIPsPossible = (2 ** hostIPRange)
    totalUsableIPs = totalIPsPossible - 2
    if (totalUsableIPs < 0):
        totalUsableIPs = 0
    ipRangeInfo = IPRangeInfo(
        TotalPossibleIPs=totalIPsPossible, TotalUsableIPs=totalUsableIPs)
    ipBinaryMerged = __convertIPToBinary(ipAddress)
    ipRangeInfo.SubnetMask = __extractSubnetMask(ipBinaryMerged, cidrRange)
    ipRangeInfo.NetworkAddress = __extractNetworkAddress(
        ipBinaryMerged, cidrRange)
    ipRangeInfo.BroadcaseAddress = __extractBroadcastAddress(
        ipBinaryMerged, cidrRange)
    return ipRangeInfo
