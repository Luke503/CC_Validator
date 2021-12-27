import unittest
import random
from unittest import TestCase
from credit_card_validator import credit_card_validator


class TestCards(unittest.TestCase):
    # All range test
    def test1(self):
        for i in range(0, 250):
            card_num = random.randint(0000000000000000, 9999999999999999)
            credit_card_validator(card_num)

    # Visa test (ieration 2)
    def test2(self):
        for i in range(0, 100000):
            card_num = random.randint(4000000000000000, 4999999999999999)
            credit_card_validator(card_num)

    # Amex test
    def test3(self):
        for i in range(0, 1000):
            card_num = random.randint(340000000000000, 379999999999999)
            credit_card_validator(card_num)


if __name__ == '__main__':
    unittest.main()
