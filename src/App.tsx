import React from 'react';
import { useEffect, useState, useRef} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import debounce from 'lodash/debounce';

import { getListPokemons } from 'actions/dataActions';
import type { TDetailData } from 'types/declaredTypes';
import 'App.scss';

function App() {
  const [offsetData, setOffsetData] = useState<number>(0);
  const [datas, setDatas] = useState<TDetailData[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<number>(0);
  const [name, setName] = useState<string>('');

  const dataSelectedFields = React.useMemo(() => datas.length > 0 ? {
      name: datas[selectedData].name,
      image: datas[selectedData].image,
      types: datas[selectedData].types,
      height: datas[selectedData].height,
      weight: datas[selectedData].weight,
      color: datas[selectedData].color,
      habitat: datas[selectedData].habitat,
      abilities: datas[selectedData].abilities,
      stats: datas[selectedData].stats
    } : {
      name: '',
      image: '',
      types: [{
        name: '',
        url: ''
      }],
      height: 0,
      weight: '',
      color: '',
      habitat: '',
      abilities: [{
        name: '',
        url: ''
      }],
      stats: [{
        name: '',
        base_stat: 0
      },{
        name: '',
        base_stat: 0
      },{
        name: '',
        base_stat: 0
      },{
        name: '',
        base_stat: 0
      },{
        name: '',
        base_stat: 0
      },{
        name: '',
        base_stat: 0
      }]
    }, [datas, selectedData]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getListPokemons(offsetData, (detailDataResponse: TDetailData[]) => {
      setDatas(detailDataResponse);
    });
  }, []);

  const toggle = () => setModal(!modal);

  const onSelectedPokemon = (index: number) => {
    setSelectedData(index);
    toggle();
  };

  const renderPokemons = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let cols: any[] = [], types: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = [];
    let iRows = 0;
    datas.forEach((d, index) => {
      types = [];
      d.types.forEach((dTypes, index) => {
        types.push(
          <Button key={`button${index}`} className={`bd-none background-color-${dTypes.name}`}><span className="textCapitalize">{dTypes.name}</span></Button>
        )
      });
      cols.push(
        <Col key={`col${index}`} className="mb-3" md="3">
          <Card onClick={() => onSelectedPokemon(index)}>
            <img
              alt={d.name}
              src={d.image}
            />
            <CardBody>
              <CardTitle tag="h5" className="text-center">
                <span className="textCapitalize">{d.name}</span>
              </CardTitle>
              <CardText className="text-center">
                {types}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      );
      if ((index + 1) % 4 === 0) {
        rows.push(
          <Row key={`row${iRows}`}>{cols}</Row>
        );
        cols = [];
        iRows += 1;
      }
    });
    return rows;
  }

  const onChangeName = useRef(
		debounce((e) => {
			setName(e.target.value);
		}, 500)
	).current;

  return (
    <>
      <Container className="mt-3 mb-3">
        <h2 className="text-center mb-3">Pokedex</h2>
        <h4 className="text-center mb-3">Pokemon search tools</h4>
      </Container>
      <div className="fullWrap">
        <Container className="mb-3">
          <Row className="mb-3">
            <Col md="6">
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label className="filterLabel search mt-2">
                      Search Name
                    </Label>                
                    <Input
                      id="searchName"
                      name="searchName"
                      type="text"
                      value={name}
                      placeholder="Search Pokemon name..."
                      onChange={(e) => onChangeName(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="6" >
              <Row>
                <Col md="12">
                  <Label className="filterLabel mt-2">
                    Filter by Attribute
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="mt-2 mb-3">                
                    <Input
                      id="searchByAbility"
                      name="searchByAbility"
                      type="select"
                      placeholder="Select Ability"
                    >
                      <option>
                        Select Types
                      </option>
                      <option>
                        1
                      </option>
                      <option>
                        2
                      </option>
                      <option>
                        3
                      </option>
                      <option>
                        4
                      </option>
                      <option>
                        5
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mt-2 mb-3">
                    <Input
                      id="searchByLocation"
                      name="searchByLocation"
                      type="select"
                      placeholder="Select Location"
                    >
                      <option>
                        Select Location
                      </option>
                      <option>
                        1
                      </option>
                      <option>
                        2
                      </option>
                      <option>
                        3
                      </option>
                      <option>
                        4
                      </option>
                      <option>
                        5
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mb-3">
        {renderPokemons()}
      </Container>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}><span className="textCapitalize">{dataSelectedFields.name}</span></ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <img
                alt={dataSelectedFields.name}
                src={dataSelectedFields.image}
              />
              <div className="mt-3 text-center mb-3">
                <h5 className="mb-3">Type</h5>
                {dataSelectedFields.types.map((d, index) => (
                  <Button key={`buttonModal${index}`} className={`bd-none background-color-${d.name}`}><span className="textCapitalize">{d.name}</span></Button>
                ))}
              </div>
            </Col>
            <Col md="6">
              <div className="detailWrap generalDetail mb-3">
                <Row>
                  <Col md="6">
                    <div>
                      <Label>Height</Label>
                      <p>{dataSelectedFields.height}</p>
                    </div>
                    <div>
                      <Label>Weight</Label>
                      <p>{dataSelectedFields.weight}</p>
                    </div>
                    <div>
                      <Label>Color</Label>
                      <p>{dataSelectedFields.color}</p>
                    </div>
                  </Col>
                  <Col md="6">
                    <div>
                      <Label>Habitat</Label>
                      <p>{dataSelectedFields.habitat}</p>
                    </div>
                    <div>
                      <Label>Abilities</Label>
                      <p>
                        {dataSelectedFields.abilities.map((d, index) => (
                          <span key={`abilities${index}`}>{d.name},&nbsp;</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="detailWrap statsDetail">
                <Row>
                  <Col md="12">
                    <h5>Stats</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div>
                      <Label>HP</Label>
                      <p>{dataSelectedFields.stats[0].base_stat}</p>
                    </div>
                    <div>
                      <Label>Attack</Label>
                      <p>{dataSelectedFields.stats[1].base_stat}</p>
                    </div>
                    <div>
                      <Label>Defense</Label>
                      <p>{dataSelectedFields.stats[2].base_stat}</p>
                    </div>
                  </Col>
                  <Col md="6">
                    <div>
                      <Label>Special Attack</Label>
                      <p>{dataSelectedFields.stats[3].base_stat}</p>
                    </div>
                    <div>
                      <Label>Special Defense</Label>
                      <p>{dataSelectedFields.stats[4].base_stat}</p>
                    </div>
                    <div>
                      <Label>Speed</Label>
                      <p>{dataSelectedFields.stats[5].base_stat}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
