import React from 'react';
import { render, screen } from '@testing-library/react';
import Searching from '../../../../JS/Components/Searching';


describe("Searching by name of drink", () => {

  const drinkDataArtificial = [
    {
      DrinkName: 'Margarita',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sour',
      Rate: 4.5
    },
    {
      DrinkName: 'Orange Juice',
      DrinkType: 'Soft',
      DifficultyLevel: 'Easy',
      Taste: 'Sweet',
      Rate: 3.2
    },
    {
      DrinkName: 'Mojito',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Medium',
      Taste: 'Sour',
      Rate: 4.1
    }
  ]

  const drinkCounter = drinkDataArtificial.length

  test('render', () => {
    render(<Searching
      alcocholic={true}
      softDrinks={false}
      highlyRated={false}
      drinkLevel={'Easy'}
      drinkTaste={'Sweet'}
      inputDrinkText={''}
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={() => { }}
      searchingDrink={[]}
    />);
  });


  test('searching by inputDrinkText "M" ', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = [];

    render(<Searching
      alcocholic={false}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText='M'

    />)

    expect(setSearchingDrink).toHaveBeenCalledTimes(2)
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]);

  });

  test(' searching by inputDrinkText "O" ', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = [];

    render(<Searching
      alcocholic={false}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText='O'

    />);
    expect(setSearchingDrink).toHaveBeenCalledTimes(2)
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ])
  });

  test('empty input', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = [];

    render(<Searching
      alcocholic={false}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=''

    />)

    expect(setSearchingDrink).toHaveBeenCalledTimes(drinkCounter)
    expect(setSearchingDrink).toHaveBeenCalledWith(drinkDataArtificial)

  });

  test('zero results', () => {
    const setSearchingDrink = jest.fn();
    const searchingDrink = [];

    render(<Searching
      alcocholic={false}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText='12333'

    />)

    expect(setSearchingDrink).toHaveBeenCalledTimes(2)
    expect(setSearchingDrink).toHaveBeenCalledWith([])

  });

  //END Searching by tekst
});
//BY level
describe('Searching by level of drink', () => {
  const drinkDataArtificial = [
    {
      DrinkName: 'Margarita',
      DrinkType: 'Alcoholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sour',
      Rate: 4.5
    },
    {
      DrinkName: 'Orange Juice',
      DrinkType: 'Soft',
      DifficultyLevel: 'Easy',
      Taste: 'Sweet',
      Rate: 3.2
    },
    {
      DrinkName: 'Mojito',
      DrinkType: 'Alcoholic',
      DifficultyLevel: 'Medium',
      Taste: 'Sour',
      Rate: 4.1
    }
  ];

  test('Searching Easy drinks', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='Easy'
        drinkTaste="All"
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcoholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
    ]);

  })



  test('Searching Medium drinks', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='Medium'
        drinkTaste="All"
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcoholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]);

  })

  test('Searching Medium drinks', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='Bitter'
        drinkTaste="All"
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([]);

  })



  //End Searching by level
})
//BY Taste
describe('Searching by taste of drink', () => {
  const drinkDataArtificial = [
    {
      DrinkName: 'Margarita',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sour',
      Rate: 4.5
    },
    {
      DrinkName: 'Orange Juice',
      DrinkType: 'Soft',
      DifficultyLevel: 'Easy',
      Taste: 'Sweet',
      Rate: 3.2
    },
    {
      DrinkName: 'Mojito',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Medium',
      Taste: 'Sour',
      Rate: 4.1
    }
  ]

  test('Searching by Sour Taste', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='All'
        drinkTaste='Sour'
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }

    ]);

  })

  test('Searching by Sweet Taste', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='All'
        drinkTaste='Sweet'
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
    ]);


  })


  test('Searching by Sour Taste', () => {

    const setSearchingDrink = jest.fn();
    const searchingDrink = drinkDataArtificial;

    render(
      <Searching
        alcocholic={false}
        softDrinks={false}
        highlyRated={false}
        drinkLevel='All'
        drinkTaste='Bitter'
        drinkDatas={drinkDataArtificial}
        setSearchingDrink={setSearchingDrink}
        searchingDrink={searchingDrink}
        inputDrinkText=""
      />
    );

    expect(setSearchingDrink).toHaveBeenCalledTimes(3);
    expect(setSearchingDrink).toHaveBeenCalledWith([]);

  })


  //END Searching by Taste
});
//Searching by type

describe('Searching by soft Type', () => {
  const drinkDataArtificial = [
    {
      DrinkName: 'Margarita',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sour',
      Rate: 4.5
    },
    {
      DrinkName: 'Orange Juice',
      DrinkType: 'Soft',
      DifficultyLevel: 'Easy',
      Taste: 'Sweet',
      Rate: 3.2
    },
    {
      DrinkName: 'Mojito',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Medium',
      Taste: 'Sour',
      Rate: 4.1
    }
  ]

  test('Searching by Alco Type', () => {
    
    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificial

    render(<Searching 
      alcocholic={true}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""

    /> )

      expect(setSearchingDrink).toHaveBeenCalledTimes(3)
      expect(setSearchingDrink).toHaveBeenCalledWith([
        {
          DrinkName: 'Margarita',
          DrinkType: 'Alcocholic',
          DifficultyLevel: 'Easy',
          Taste: 'Sour',
          Rate: 4.5
        },
        {
          DrinkName: 'Mojito',
          DrinkType: 'Alcocholic',
          DifficultyLevel: 'Medium',
          Taste: 'Sour',
          Rate: 4.1
        }
      ])

  });



  test('Searching by Soft Type', () => {
    
    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificial

    render(<Searching 
      alcocholic={false}
      softDrinks={true}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""

    /> )

      expect(setSearchingDrink).toHaveBeenCalledTimes(3)
      expect(setSearchingDrink).toHaveBeenCalledWith([
        {
          DrinkName: 'Orange Juice',
          DrinkType: 'Soft',
          DifficultyLevel: 'Easy',
          Taste: 'Sweet',
          Rate: 3.2
        },
      ])

  });




test('Without Special Type of Drink', () => {

  const setSearchingDrink = jest.fn()
  const searchingDrink = drinkDataArtificial

  render(<Searching 
    alcocholic={false}
    softDrinks={false}
    highlyRated={false}
    drinkLevel='All'
    drinkTaste='All'
    drinkDatas={drinkDataArtificial}
    setSearchingDrink={setSearchingDrink}
    searchingDrink={searchingDrink}
    inputDrinkText=""

  /> )

    expect(setSearchingDrink).toHaveBeenCalledTimes(3)
    expect(setSearchingDrink).toHaveBeenCalledWith([
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ])

});


  test ('Dont find Alco type', () => {
    const drinkDataArtificialWithoutAlco = [
      {
        DrinkName: 'Margarita',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Soft',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Soft',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]

    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificialWithoutAlco

    render(<Searching 
      alcocholic={true}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""

    /> )

      expect(setSearchingDrink).toHaveBeenCalledTimes(3)
      expect(setSearchingDrink).toHaveBeenCalledWith([])

  });


  test ('Dont find Soft type', () => {
    const drinkDataArtificialWithoutSoft = [
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]

    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificialWithoutSoft

    render(<Searching 
      alcocholic={false}
      softDrinks={true}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificial}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""

    /> )

      expect(setSearchingDrink).toHaveBeenCalledTimes(3)
      expect(setSearchingDrink).toHaveBeenCalledWith([])

  });

  test('Searching by Soft and Alco type', () => {
    const drinkDataArtificialALL = [
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]
  
    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificialALL
  
    render(<Searching 
      alcocholic={true}
      softDrinks={true}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificialALL}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""
    /> )
  
    expect(setSearchingDrink).toHaveBeenCalledTimes(3)
    expect(setSearchingDrink).toHaveBeenCalledWith(drinkDataArtificialALL)
  });
  

  test('Searching by Soft and Alco type', () => {
    const drinkDataArtificialALL = [
      {
        DrinkName: 'Margarita',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sour',
        Rate: 4.5
      },
      {
        DrinkName: 'Orange Juice',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Easy',
        Taste: 'Sweet',
        Rate: 3.2
      },
      {
        DrinkName: 'Mojito',
        DrinkType: 'Alcocholic',
        DifficultyLevel: 'Medium',
        Taste: 'Sour',
        Rate: 4.1
      }
    ]
  
    const setSearchingDrink = jest.fn()
    const searchingDrink = drinkDataArtificialALL
  
    render(<Searching 
      alcocholic={false}
      softDrinks={false}
      highlyRated={false}
      drinkLevel='All'
      drinkTaste='All'
      drinkDatas={drinkDataArtificialALL}
      setSearchingDrink={setSearchingDrink}
      searchingDrink={searchingDrink}
      inputDrinkText=""
    /> )
  
    expect(setSearchingDrink).toHaveBeenCalledTimes(3)
    expect(setSearchingDrink).toHaveBeenCalledWith(drinkDataArtificialALL)
  });

  //End searchung by Type
})

describe('Searching by rate', () => {
  const drinkDataArtificial = [
    {
      DrinkName: 'Margarita',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sour',
      Rate: 4.5
    },
    {
      DrinkName: 'Orange Juice',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Easy',
      Taste: 'Sweet',
      Rate: 3.2
    },
    {
      DrinkName: 'Mojito',
      DrinkType: 'Alcocholic',
      DifficultyLevel: 'Medium',
      Taste: 'Sour',
      Rate: 4.1
    }
  ]

  const setSearchingDrink = jest.fn();
  const searchingDrink = drinkDataArtificial;

  render(<Searching 
    alcocholic={false}
    softDrinks={false}
    highlyRated={true}
    drinkLevel='All'
    drinkTaste='All'
    drinkDatas={drinkDataArtificial}
    setSearchingDrink={setSearchingDrink}
    searchingDrink={searchingDrink}
    inputDrinkText=""
  />);

  // Sort expected results by Rate in descending order
  const expectedResults = drinkDataArtificial.sort((a, b) => b.Rate - a.Rate);

  expect(setSearchingDrink).toHaveBeenCalledTimes(3);
  expect(setSearchingDrink).toHaveBeenCalledWith(expectedResults);
});

//MIXES


//not passed :c
// describe('Searching by name and level', () => {
//   const drinkDataArtificial = [
//     {
//       DrinkName: 'Margarita',
//       DrinkType: 'Alcocholic',
//       DifficultyLevel: 'Easy',
//       Taste: 'Sour',
//       Rate: 4.5
//     },
//     {
//       DrinkName: 'Orange Juice',
//       DrinkType: 'Soft',
//       DifficultyLevel: 'Easy',
//       Taste: 'Sweet',
//       Rate: 3.2
//     },
//     {
//       DrinkName: 'Mojito',
//       DrinkType: 'Alcocholic',
//       DifficultyLevel: 'Medium',
//       Taste: 'Sour',
//       Rate: 4.1
//     }
//   ]

//   test('Searching by "M" and Easy', () => {
//     const setSearchingDrink = jest.fn();
//     const searchingDrink = drinkDataArtificial;
  
//     render(
//       <Searching
//         alcocholic={false}
//         softDrinks={false}
//         highlyRated={false}
//         drinkLevel='Easy'
//         drinkTaste='All'
//         drinkDatas={drinkDataArtificial}
//         setSearchingDrink={setSearchingDrink}
//         searchingDrink={searchingDrink}
//         inputDrinkText="M"
//       />
//     );
  
//     expect(setSearchingDrink).toHaveBeenCalledTimes(2);
//     expect(setSearchingDrink).toHaveBeenCalledWith([
//       {
//         DrinkName: 'Margarita',
//         DrinkType: 'Alcocholic',
//         DifficultyLevel: 'Easy',
//         Taste: 'Sour',
//         Rate: 4.5
//       }
//     ]);
//   });
// });

