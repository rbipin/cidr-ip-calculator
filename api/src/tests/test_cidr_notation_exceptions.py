import unittest
from logic.cidr_calculator import CIDRCalculator
from models.CustomExceptions import *


class TestCIDRNotationExceptions(unittest.TestCase):

    def test_when_start_is_greater_than_end_ip_only_last_octect(self):
        startIP = '74.150.120.8'
        endIP = '74.150.120.7'
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateCIDRNotation, startIP, endIP)

    def test_when_start_is_greater_than_end_ip_only_first_octect(self):
        startIP = '120.150.120.0'
        endIP = '74.150.120.7'
        cidr = CIDRCalculator()
        self.assertRaises(BadArgumentExcepton,
                          cidr.calculateCIDRNotation, startIP, endIP)


if __name__ == "main":
    unittest.main()
