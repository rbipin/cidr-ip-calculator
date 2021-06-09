"""
"""

from pydantic import BaseModel
from typing import Optional


class IPRangeInfo(BaseModel):
    TotalPossibleIPs: Optional[int]
    TotalUsableIPs: Optional[int]
    SubnetMask: Optional[str]
    NetworkAddress: Optional[str]
    BroadcastAddress: Optional[str]
