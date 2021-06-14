import unittest
from logic.cidr_calculator import CIDRCalculator
from models.CustomExceptions import *


class TestCalculateIPRange(unittest.TestCase):

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

    def test_calculate_ip_range_when_ip_over_255_all(self):
        ip = '256.256.256.256'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_over_255_middle(self):
        ip = '10.256.150.4'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_over_negative_number(self):
        ip = '74.192.-2.0'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_decimal_number(self):
        ip = '74.192.0.5.0'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_has_empty(self):
        ip = '74.192..0'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_is_incomplete(self):
        ip = '74.192.0'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_has_additional_dot(self):
        ip = '256.150.120.4.'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_has_more_than_4_parts(self):
        ip = '256.150.120.4.0'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_over_255_start(self):
        ip = '256.150.120.4'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_over_255_end(self):
        ip = '74.150.120.256'
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_is_empty(self):
        ip = ''
        cidrRange = 32
        cidr = CIDRCalculator()
        self.assertRaises(NullArgumentException,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_cidr_is_0(self):
        ip = '74.125.227.0'
        cidrRange = 0
        cidr = CIDRCalculator()
        self.assertRaises(NullArgumentException,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_ip_and_cidr_are_empty_and_0(self):
        ip = ''
        cidrRange = 0
        cidr = CIDRCalculator()
        self.assertRaises(NullArgumentException,
                          cidr.calculateIPRange, ip, cidrRange)

    def test_calculate_ip_range_when_cidrRange_0(self):
        ip = '74.125.227.0'
        cidrRange = 0
        cidr = CIDRCalculator()
        self.assertRaises(NullArgumentException,
                          cidr.calculateIPRange, ip, cidrRange)


if __name__ == "main":
    unittest.main()
