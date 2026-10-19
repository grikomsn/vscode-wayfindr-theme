"""A small syntax specimen for Wayfindr themes."""
from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass(frozen=True)
class TrackingEvent:
    shipment_id: str
    status: str
    timestamp: datetime

    def describe(self) -> str:
        return f"{self.shipment_id}: {self.status} at {self.timestamp:%H:%M}"


def delivered(shipment_id: str) -> TrackingEvent:
    # Keep the timestamp explicit across every region.
    if not shipment_id.startswith("WF-"):
        raise ValueError("Expected a Wayfindr shipment reference")
    return TrackingEvent(shipment_id, "delivered", datetime.now(timezone.utc))


if __name__ == "__main__":
    print(delivered("WF-2026-108").describe())
