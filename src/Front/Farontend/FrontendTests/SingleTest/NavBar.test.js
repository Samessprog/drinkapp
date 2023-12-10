
import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import React from "react";
import NavBar from '../NavBarComponents/NavBar'



describe('Navbar input', () => {

    test('Render Navbar', () => {
        const { getByText } = render(<NavBar />)
        expect(getByText('BRANDLOGO')).toBeInTheDocument()
    });

    test('onChange function should be called with correct value', () => {
        const setInputDrinkText = jest.fn();
        jest.spyOn(React, "useState").mockReturnValueOnce(["", setInputDrinkText]);

        const { getByPlaceholderText } = render(<NavBar />);
        const input = getByPlaceholderText('Enter drink name');
        fireEvent.change(input, { target: { value: 'whiskey' } });

        expect(setInputDrinkText).toHaveBeenCalledWith('whiskey');
    });

    test('onChange function should be called with incorrect value', () => {
        const setInputDrinkText = jest.fn()
        jest.spyOn(React, "useState").mockReturnValueOnce(["", setInputDrinkText])

        const { getByPlaceholderText } = render(<NavBar />)
        const input = getByPlaceholderText('Enter drink name')
        fireEvent.change(input, { target: { value: 'ZZ' } })

        expect(() => {
            expect(setInputDrinkText).toHaveBeenCalledWith('wO')
        }).toThrow()

    });

    test('onChange function should be called with blank value', () => {
        const setInputDrinkText = jest.fn()
        jest.spyOn(React, "useState").mockReturnValueOnce(["", setInputDrinkText])

        const { getByPlaceholderText } = render(<NavBar />)
        const input = getByPlaceholderText('Enter drink name')
        fireEvent.change(input, { target: { value: ' ' } })

        expect(setInputDrinkText).toHaveBeenCalledWith(' ')

    });



});

