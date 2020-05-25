import styled from 'styled-components';
import {
    TextField,
    MenuItem,
    Paper
} from '@material-ui/core';

const StyledTextField = styled(TextField)`
    width: 100%;
`;

const StyledMenuItem = styled(MenuItem)`
    background-color: red,
    color: red;
`;

const ItemsContainer = styled(Paper)`
    max-height: 400px;
    overflow: hidden;
    position: absolute;
    width: 100%;
`;

const SearchInputContainer = styled.div`
    background-color: #f9f9f9;
    width: 750px;;
    position: relative;
`;

export {
    SearchInputContainer,
    StyledTextField,
    StyledMenuItem,
    ItemsContainer
}
