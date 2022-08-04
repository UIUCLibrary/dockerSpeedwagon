import {render} from '@testing-library/react';
import FileManagement, {splitRoutes} from '../frontend/src/FileManagement';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
test('placeholder', ()=>{
  render(
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<FileManagement/>}/>
         </Routes>
       </BrowserRouter>
  )
})

describe('splitRoutes', ()=>{
  it.each([
      [
          '/',
        [
            {
              display:'(Root)',
              path:'/'
            }
        ]
      ],
      [
          '/sample',
          [
            {
              display:'(Root)',
              path: '/'
            },
            {
              display: 'sample',
              path: '/sample'
            }
          ]
      ],
    [
          '/multiple/directories',
          [
            {
              display:'(Root)',
              path: '/'
            },
            {
              display: 'multiple',
              path: '/multiple'
            },
            {
              display: 'directories',
              path: '/multiple/directories'
            }
          ]
      ],
  ])('%p == %o', (
      inputString: string,
      expected: {   display: string, path: string }[]
  ) =>{
    expect(splitRoutes(inputString)).toStrictEqual(expected)
  })
})
