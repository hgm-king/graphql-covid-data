import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/css'
import { createClient, Provider } from 'urql'

import Antibody from './containers/Antibody/'
import ByRace from './containers/ByRace/'

import FlexRow from './components/FlexRow'
import Button from './components/Button'

import theme from './theme/'

const client = createClient({
  url: 'http://127.0.0.1:3000/graphql',
});

export default function App( props ) {

  const navs = [
    'Antibodies',
    'ByRace'
  ]

  const [selected, setSelected] = useState(navs[1])

  const main = css`
    color: ${theme.colors.black};
    margin-left: 48px;
    margin-right: 48px;
  `

  const selectHeader = (header) => (e) => setSelected(header)
  const selectedPredicate = (header) => header === selected ? 'black' : 'white'
  const makeNav = (header, i) => (
    <div key={i}>
      <Button
        type={selectedPredicate(header)}
        onClick={selectHeader(header)} >
        {header}
      </Button>
    </div>
  )

  return (
    <Provider value={client}>
      <div id='main' className={main}>
        <h6>Hello, World!</h6>
        <p>NYC Covid Data Dashboard by HG King</p>
        <FlexRow flex='flex-start'>{navs.map(makeNav)}</FlexRow>
        {
          selected === 'Antibodies' ?
            <Antibody />
          : selected === 'ByRace' ?
            <ByRace />
          : <h1>None</h1>
        }
      </div>
    </Provider>
  )
}
