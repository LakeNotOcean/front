import styled from "styled-components";
import { Category, Item } from "./common/commonClasses";

const Div = styled.div`
    margin: 20px;
`;

export default function PerCategoryRevenueInfo(props: {categories: Array<Category>}) {
    return <Div>{props.categories.map(category => <Div>{category.format_li_horizontal()}</Div>)}</Div>;
}