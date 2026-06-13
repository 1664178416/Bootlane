import unittest

from app.calculator import add


class CalculatorTest(unittest.TestCase):
    def test_adds_numbers(self):
        self.assertEqual(add(2, 3), 5)
