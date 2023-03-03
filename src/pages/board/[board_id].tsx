import { useRouter } from "next/router";

const Board = () => {
    const router = useRouter();
    const { board_id } = router.query;
    return (
        <div>
        <h1>Board</h1>
        <h2>{board_id}</h2>
        </div>
    );
}

export default Board;