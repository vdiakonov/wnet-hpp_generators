# HPP Generators for Testing Hosted Pages

## Overview

These helper pages are designed to generate Gateway Hosted Pages for comprehensive testing of the following services:
- Payments Page
- Secure Tokens Page
- Subscriptions Page
- Bulk Payments Servlet
- MPI Servlet

## Features

Supported functionalities include:
- GET and POST requests
- embedding a page inside an iframe with GET and POST methods
  - optional `sandbox` attribute with configurable tokens to lift particular restrictions on embedded content
- Various Nettraxion features such as
  - Payments and Pre-Authorizations
  - Ecom, MoTo, and CHP transaction types
  - AVS (Address Verification System) Data
  - Level 2 and Level 3 support with line items
  - Tokenization for secure storage of cardholder data
  - MD5 and SHA-512 Hashing for secure requests
  - Background validation
  - and more...

## Usage Instructions

1. Open the desired helper page (e.g., Payments Page, Secure Tokens Page).
2. Fill in the required fields in the form provided.
3. Submit the form to generate and test the hosted page.

## Notes

- For more information on Hosted Pages, Nettraxion features and configuration options, refer to the following resources:
  - [Hosted Pages Specification](https://developers.worldnetpayments.com/hosted_pages:introduction)
  - [Integration Guides](https://developers.worldnetpayments.com/selfcare:introduction)
  - [Payroc Gateway Knowledge Base](https://payroc.atlassian.net/wiki/x/AYBRhQ)