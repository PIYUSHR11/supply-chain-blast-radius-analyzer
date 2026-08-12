# Dataset Plan

## Purpose

This document defines the initial dataset used by the Supply Chain Blast Radius & SPOF Analyzer.

The dataset is intentionally small but realistic enough to demonstrate:

- Blast Radius Analysis
- Single Point of Failure Detection
- Dependency Chains
- Alternative Supplier Discovery

---

# Countries

| Code | Name |
|--------|--------|
| IN | India |
| CN | China |
| KR | South Korea |
| JP | Japan |
| TW | Taiwan |
| DE | Germany |
| US | United States |
| VN | Vietnam |
| TH | Thailand |
| MY | Malaysia |

---

# Suppliers

| ID | Name | Tier |
|--------|--------|--------|
| SUP001 | Samsung SDI | 1 |
| SUP002 | LG Energy | 1 |
| SUP003 | CATL | 1 |
| SUP004 | Panasonic | 1 |
| SUP005 | Bosch | 1 |
| SUP006 | Foxconn | 1 |
| SUP007 | Texas Instruments | 1 |
| SUP008 | Infineon | 1 |
| SUP009 | NXP | 1 |
| SUP010 | STMicroelectronics | 1 |
| SUP011 | Delta Electronics | 2 |
| SUP012 | ABB | 2 |
| SUP013 | TE Connectivity | 2 |
| SUP014 | Molex | 2 |
| SUP015 | Yazaki | 2 |
| SUP016 | Denso | 2 |
| SUP017 | Mitsuba | 2 |
| SUP018 | TDK | 2 |
| SUP019 | Murata | 2 |
| SUP020 | BYD Components | 2 |

---

# Products

| ID | Name |
|--------|--------|
| PROD001 | Electric Scooter X1 |
| PROD002 | Electric Scooter X2 |
| PROD003 | Electric Scooter Pro |
| PROD004 | Delivery Robot Mini |
| PROD005 | Delivery Robot Max |
| PROD006 | EV Charger Home |
| PROD007 | EV Charger Pro |
| PROD008 | Smart Battery Pack A |
| PROD009 | Smart Battery Pack B |
| PROD010 | Industrial Controller A |
| PROD011 | Industrial Controller B |
| PROD012 | Motor Drive A |
| PROD013 | Motor Drive B |
| PROD014 | Fleet Tracker A |
| PROD015 | Fleet Tracker B |

---

# Components

## Battery Components

- Battery Cell
- Battery Module
- Battery Pack
- Battery BMS

## Power Components

- Motor
- Motor Controller
- Power Inverter
- Power Relay
- DC Converter

## Electronics Components

- Microcontroller
- PCB
- Power MOSFET
- Voltage Sensor
- Current Sensor
- Temperature Sensor
- GPS Module
- LTE Module

## Connectivity Components

- Antenna
- WiFi Module
- Bluetooth Module

## Mechanical Components

- Wiring Harness
- Connector
- Fuse
- Cooling Fan
- Bearing
- Brake Assembly

## Charging Components

- Charging Port
- AC Charger
- DC Fast Charger

## Safety Components

- Safety Controller
- Emergency Cutoff

---

# Factories

| ID | Name |
|--------|--------|
| FAC001 | Pune Assembly Plant |
| FAC002 | Bangalore Electronics Plant |
| FAC003 | Chennai Battery Plant |
| FAC004 | Gurugram Vehicle Plant |
| FAC005 | Shenzhen Components Plant |
| FAC006 | Seoul Battery Plant |
| FAC007 | Tokyo Electronics Plant |
| FAC008 | Ho Chi Minh Assembly Plant |

---

# Planned Relationship Counts

| Relationship | Target Count |
|--------|--------:|
| SUPPLIES | 40 |
| DEPENDS_ON | 30 |
| USED_IN | 60 |
| ASSEMBLES | 15 |
| LOCATED_IN | 28 |
| ALTERNATIVE_SUPPLIER | 15 |

---

# Expected Graph Size

Nodes: ~83

Relationships: ~200