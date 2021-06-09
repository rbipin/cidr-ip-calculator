import unittest
from controllers import ciderIP
from models.CustomExceptions import *


class TestCalculateIPRange(unittest.TestCase):
    def calculate_ip_for_(self):
        ip = '74.125.227.0'
        cidrRange = 29
        print(f'When IP is {ip} and CIDR Range is {cidrRange}')
        result = ciderIP.calculateIPRange(ip, cidrRange)
        print(result)
        self.assertEqual(0, 0)


if __name__ == "main":
    unittest.main()
