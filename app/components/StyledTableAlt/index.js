import styled from 'styled-components'

export const StyledTableAlt = styled.table.attrs({
  className: 'w-full overflow-hidden bg-white rounded-lg ',
})`
border-collapse:0 collapse;

  width: 100%;
 
  td {
    border-right: 3px solid #fff;
    padding: 1.7rem;
    text-align:left;
  }

  th {
    background: #1a24551a 0% 0% no-repeat padding-box;
    padding: 1.7rem;
     text-align:left;
  }

  .title {
    width: 30%;
  }
  
  @media screen and (max-width:650px){
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    tr{
      display: flex;
      flex-direction: column;
    }
    td {
    border-right: 3px solid #fff;
    padding: 5px 2px;
    text-align:left;
    width: 210px;
    min-width: 350px;
  }

  th {
    background: #1a24551a 0% 0% no-repeat padding-box;
    padding: 5px 2px;
     text-align:left;
     
  }
  }
  @media screen and (max-width:450px){
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    tr{
      display: flex;
      flex-direction: column;
    }
    td {
    border-right: 3px solid #fff;
    padding: 5px 2px;
    text-align:left;
    width: 210px;
    max-width:250px;
    min-width: 190px;
  }

  th {
    background: #1A24551A;
    padding: 5px 2px;
     text-align:left;

  }
  }
`
