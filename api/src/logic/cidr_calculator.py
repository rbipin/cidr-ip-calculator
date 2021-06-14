from models.IPRangeInfo import IPRangeInfo
from models.CustomExceptions import *


class CIDRCalculator:

    @classmethod
    def calculateIPRange(self, ipAddress: str, cidrRange: int) -> IPRangeInfo:
        self.__validateIPAddress(ipAddress)
        self.__validateCIDRRange(cidrRange)
        return self.__calculateIPCIDRRange(ipAddress, cidrRange)

    @classmethod
    def calculateCIDRNotation(self, startIPAddress: str, endIPAddress: str):
        self.__validateIPAddress(startIPAddress)
        self.__validateIPAddress(endIPAddress)
        return self.__calculateIPCIDRRange(startIPAddress, endIPAddress)

    @classmethod
    def __calculateIPCIDRRange(self, ipAddress, cidrRange) -> IPRangeInfo:
        totalBits = 32
        hostIPRange = totalBits - cidrRange
        totalIPsPossible = (2 ** hostIPRange)
        totalUsableIPs = totalIPsPossible - 2
        if (totalUsableIPs < 0):
            totalUsableIPs = 0
        ipRangeInfo = IPRangeInfo(
            TotalPossibleIPs=totalIPsPossible, TotalUsableIPs=totalUsableIPs)
        ipBinaryMerged = self.__convertIPToBinary(ipAddress)
        ipRangeInfo.SubnetMask = self.__extractSubnetMask(
            ipBinaryMerged, cidrRange)
        ipRangeInfo.NetworkAddress = self.__extractNetworkAddress(
            ipBinaryMerged, cidrRange)
        ipRangeInfo.BroadcastAddress = self.__extractBroadcastAddress(
            ipBinaryMerged, cidrRange)
        return ipRangeInfo

    @classmethod
    def __calculateCIDRNotation(startingIPAddress: str, endingIPAddr: str):
        pass

    @classmethod
    def __validateIPAddress(self, ipAddress: str):
        if not ipAddress:
            raise NullArgumentException(
                message='IP Address cannot be null or empty')
        ipAddrParts = ipAddress.split('.')
        if len(ipAddrParts) < 4 or len(ipAddrParts) > 4:
            raise BadArgumentExcepton(message='IP Address is incorrect')
        for ipPart in ipAddrParts:
            if not ipPart.isnumeric():
                raise BadArgumentExcepton(message='IP Address is incorrect')
            ipPartNum = int(ipPart)
            if ipPartNum > 255:
                raise BadArgumentExcepton(message='IP Address is incorrect')

    @classmethod
    def __validateCIDRRange(self, cidrRange: int):
        if not cidrRange or cidrRange == 0:
            raise NullArgumentException(
                message="CIDR cannot be null or Zero")

    @classmethod
    def __convertIPToBinary(self, ipAddress):
        ipBinary = []
        ip = [int(x) for x in ipAddress.split('.')]
        # Binary format of the IP
        for ipSec in ip:
            binaryIPSection = format(ipSec, '08b')
            ipBinary.append(binaryIPSection)
        ipBinaryMerged = "".join(ipBinary)
        return ipBinaryMerged

    @classmethod
    def __convertBinaryToIP(self, ipBinaryString):
        binaryOctet = self.__convertStringBinaryToOctet(ipBinaryString)
        ipAddress = self.__convertBinaryToInt(binaryOctet)
        return ipAddress

    @classmethod
    def __convertStringBinaryToOctet(self, ipBinaryString):
        firstOctet = ipBinaryString[0:8]
        secondOctet = ipBinaryString[8:16]
        thirdOctet = ipBinaryString[16:24]
        fourthOctet = ipBinaryString[24:32]
        return (firstOctet, secondOctet, thirdOctet, fourthOctet)

    @classmethod
    def __convertBinaryToInt(self, binaryOctetList):
        ipList = []
        for octet in binaryOctetList:
            ip = int(octet, 2)
            ipList.append(ip)
        return ipList

    @classmethod
    def __extractNetworkAndHostIPPart(self, ipBinaryMerged, cidrRange):
        totalBits = 32
        hostIPRange = -1 * (totalBits - cidrRange)
        networkIPPart = ipBinaryMerged[:cidrRange]
        hostIPPart = ipBinaryMerged[hostIPRange:]
        return (networkIPPart, hostIPPart)

    @classmethod
    def __zeroToOnes(self, ipBinary):
        newIPBinary = ''
        for ipBin in ipBinary:
            if (ipBin == '0'):
                ipBin = '1'
            newIPBinary += ipBin
        return newIPBinary

    @classmethod
    def __OnesToZero(self, ipBinary):
        newIPBinary = ''
        for ipBin in ipBinary:
            if (ipBin == '1'):
                ipBin = '0'
            newIPBinary += ipBin
        return newIPBinary

    @classmethod
    def __extractSubnetMask(self, ipBinaryMerged, cidrRange):
        subnetMaskIPBinary = ''
        ipParts = self.__extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
        networkIPPart = ipParts[0]
        hostIPPart = ipParts[1]
        newNetworkIP = self.__zeroToOnes(networkIPPart)
        subnetMaskIPBinary = newNetworkIP + hostIPPart
        subnetMask = self.__convertBinaryToIP(subnetMaskIPBinary)
        return ".".join(map(str, subnetMask))

    @classmethod
    def __extractNetworkAddress(self, ipBinaryMerged, cidrRange):
        ipParts = self.__extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
        newHostIP = ''
        networkIPPart = ipParts[0]
        hostIPPart = ipParts[1]
        newHostIP = self.__OnesToZero(hostIPPart)
        networkAddressBinary = networkIPPart + newHostIP
        networkAddress = self.__convertBinaryToIP(networkAddressBinary)
        return ".".join(map(str, networkAddress))

    @classmethod
    def __extractBroadcastAddress(self, ipBinaryMerged, cidrRange):
        ipParts = self.__extractNetworkAndHostIPPart(ipBinaryMerged, cidrRange)
        newHostIP = ''
        networkIPPart = ipParts[0]
        hostIPPart = ipParts[1]
        for ipBin in hostIPPart:
            if (ipBin == '0'):
                ipBin = '1'
            newHostIP += ipBin
        broadcastAddressBinary = networkIPPart + newHostIP
        broadcastAddress = self.__convertBinaryToIP(broadcastAddressBinary)
        return ".".join(map(str, broadcastAddress))