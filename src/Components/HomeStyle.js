import styled from 'styled-components'
import Background from '../Images/bg1.jpg'
export const MainBackground = styled.div`
    background-image: url(${Background});
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
`
export const NavLink=styled.li`
    fontSize:21px;
    fontWeight: 600;
    &:hover{
        border-bottom: 3px solid yellow;
    };
`
export const HoverProduct=styled.div`
    width: 350px;
    height: auto; 
    justify-content: left;
    align-items: left;
    margin-bottom: 50px;
    transition: all 0.3s ease-in-out;
    padding: 12px;
    border-radius: 10px; 
    &:hover{
        box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.3);
    }
`