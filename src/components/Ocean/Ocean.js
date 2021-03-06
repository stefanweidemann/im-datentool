import React from 'react';
import { connect } from 'react-redux';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

import './Ocean.scss';
import Island from './Island';
import { rangeArray } from '../../utils/functions';
import Ranking from '../Ranking/Ranking';
import IslandChanges from '../IslandChanges/IslandChanges';

function Ocean (props) {
  const { islands, setOcean, ocean, allys, maxOcean, ranking, islandChanges } = props;

  return (
    <>
      <div className="ocean-header">
        <Button variant="dark" onClick={() => setOcean(ocean - 1)} disabled={ocean === 1}>
          Vorheriger Ozean
        </Button>
        <DropdownButton
          id="select-ocean"
          variant="secondary"
          title={`Ozean ${ocean}`}
          onSelect={(eventKey) => setOcean(parseInt(eventKey))}
        >
          {rangeArray(1, maxOcean)
          .map(oc =>
            <Dropdown.Item
              key={`Select${oc}`}
              eventKey={oc}
              active={oc === ocean}>Ozean {oc}</Dropdown.Item>,
          )
          }
        </DropdownButton>
        <Button variant="dark" onClick={() => setOcean(ocean + 1)} disabled={ocean === maxOcean}>
          Nächster Ozean
        </Button>
      </div>
      <div className="statistic-area">
        <Ranking ranking={ranking} allyList={allys.list} />
        <IslandChanges islandChanges={islandChanges} allyList={allys.list} />
      </div>
      <div className="ocean">
        {islands
        .map(island => {
          return (
            <Island
              key={`Island#${island.id}`}
              island={island}
              allyList={allys.list}
            />
          );
        })
        }
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { allys } = state;
  return { allys };
};

export default connect(mapStateToProps)(Ocean);
