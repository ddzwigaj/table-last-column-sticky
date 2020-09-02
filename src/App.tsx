import React, {useMemo} from 'react';
import styled from 'styled-components'
import Table from 'components/Table'

import mockData from './mock-data.json'

const Container = styled.div`
    margin: 55px 0
`

function App() {

    const columns = useMemo(
        () => mockData.columns,
        []
    );

  return (
      <Container>
        <Table columns={columns} data={mockData.data} />
      </Container>
  );
}

export default App;
