import unittest
from logic.cidr_calculator import CIDRCalculator
from models.CustomExceptions import *


class TestIPRange(unittest.TestCase):

    def test_calculate_ip_range_for_cidr_32(self):
        ip = '74.125.227.0'
        cidrRange = 32
        cidr = CIDRCalculator()
        result = cidr.calculateIPRange(ip, cidrRange)
        self.assertEqual(result.SubnetMask, "255.255.255.255")
        self.assertEqual(result.TotalPossibleIPs, 1)
        self.assertEqual(result.TotalUsableIPs, 0)
        self.assertEqual(result.NetworkAddress, '74.125.227.0')
        self.assertEqual(result.BroadcastAddress, '74.125.227.0')

    def test_calculate_for_cidrRange_29(self):
        ip = '74.125.227.0'
        cidrRange = 29
        cidr = CIDRCalculator()
        result = cidr.calculateIPRange(ip, cidrRange)
        self.assertEqual(result.SubnetMask, "255.255.255.248")
        self.assertEqual(result.TotalPossibleIPs, 8)
        self.assertEqual(result.TotalUsableIPs, 6)
        self.assertEqual(result.NetworkAddress, '74.125.227.0')
        self.assertEqual(result.BroadcastAddress, '74.125.227.7')

    def test_calculate_for_cidrRange_26(self):
        ip = '152.2.136.0'
        cidrRange = 26
        cidr = CIDRCalculator()
        result = cidr.calculateIPRange(ip, cidrRange)
        self.assertEqual(result.SubnetMask, "255.255.255.192")
        self.assertEqual(result.TotalPossibleIPs, 64)
        self.assertEqual(result.TotalUsableIPs, 62)
        self.assertEqual(result.NetworkAddress, '152.2.136.0')
        self.assertEqual(result.BroadcastAddress, '152.2.136.63')

    def test_calculate_for_cidrRange_15(self):
        ip = '10.150.135.110'
        cidrRange = 15
        cidr = CIDRCalculator()
        result = cidr.calculateIPRange(ip, cidrRange)
        self.assertEqual(result.SubnetMask, "255.254.0.0")
        self.assertEqual(result.TotalPossibleIPs, 131072)
        self.assertEqual(result.TotalUsableIPs, 131070)
        self.assertEqual(result.NetworkAddress, '10.150.0.0')
        self.assertEqual(result.BroadcastAddress, '10.151.255.255')


if __name__ == "main":
    unittest.main()
