import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import mockData from 'mock-data.json'
import Table from "./Table";

afterEach(cleanup);

const sortArray = (property: string, array: any[]) => {
    return array.sort( function(a, b) {
        a = a[property];
        b = b[property];
        return a < b ? -1 : 1;
    });
}

describe("<Table />", () => {
    it('clicking on sortable column should show sorted data alphabetically', () => {
        const data = mockData.data
        let activeColumnKey = ''

        const { getByTestId, getByText } = render(
            <Table data={data} columns={mockData.columns} />
        );

        mockData.columns.forEach((item) => {
            if(item.sort) {
                activeColumnKey = item.dataField
                fireEvent.click(getByText(item.header))
            }
        })

        const sortedData = sortArray(activeColumnKey, data)
        expect(getByTestId('row-0')).toHaveTextContent(sortedData[0].first_name)
    });
});