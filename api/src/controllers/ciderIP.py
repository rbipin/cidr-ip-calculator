"""
"""

from src.models.IPRangeInfo import IPRangeInfo
from src.models.CustomExceptions import *
from src.logic.cidr_calculator import CIDRCalculator


def calculateIPRange(ip: str, cidrrange: int) -> IPRangeInfo:
    cidrCalc = CIDRCalculator()
    return cidrCalc.calculateIPRange(ip, cidrrange)


def calculateCiderIPRange(startIP: str, endIP: str):
    cidrCalc = CIDRCalculator()
    result = cidrCalc.calculateCIDRNotation(startIP, endIP)
    return result
