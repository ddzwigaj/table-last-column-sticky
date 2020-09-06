import React from "react";
import { render, cleanup } from "@testing-library/react";
import mockData from 'mock-data.json'
import TBody from "./TBody";

afterEach(cleanup);

describe("<TBody />", () => {
    it('Table body should have opacity set to 0 if fade animation is not complete', async () => {
        const { getByTestId } = render(
            <TBody
                data={mockData.data}
                columns={mockData.columns}
                animating={true}
                animationComplete={false}
            />
        );

        const style = window.getComputedStyle(getByTestId('tbody'))
        expect(style.opacity).toBe('0')
    });

    it('Table body should have opacity set to 1 if fade animation is complete', async () => {
        const { getByTestId } = render(
            <TBody
                data={mockData.data}
                columns={mockData.columns}
                animating={false}
                animationComplete={true}
            />
        );

        const style = window.getComputedStyle(getByTestId('tbody'))
        expect(style.opacity).toBe('1')
    });
});