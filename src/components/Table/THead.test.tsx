import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import mockData from 'mock-data.json'
import {Column} from './Table'
import THead from "./THead";

afterEach(cleanup);

describe("<THead />", () => {
    it('clicking on sortable column should fire request sort function', async () => {
        const requestSort = jest.fn()
        let sortColumn: Column;

        const { getByText } = render(
            <THead columns={mockData.columns} requestSort={requestSort} />
        );

        mockData.columns.forEach((item) => {
            if(sortColumn)
                return
            if(item.sort) {
                sortColumn = item
                fireEvent.click(getByText(item.header))
            }
        })

        await wait(() => {
            expect(requestSort).toHaveBeenCalledTimes(1);
            expect(requestSort).toHaveBeenCalledWith(sortColumn);
        });

    });
});