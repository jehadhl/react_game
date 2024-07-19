import { LineChart } from "@mui/x-charts/LineChart";

const Chart = ({ gameBoard, crashGame }: any) => {
  console.log(gameBoard.map((entry: any) => entry.time));
  return (
    <div className="w-full h-[400px]">
      {gameBoard.length > 0 && (
        <>
          <LineChart
            xAxis={[
              {
                data: gameBoard.map((entry: any) => entry.time),
              },
            ]}
            series={[
              {
                data: gameBoard.map((entry: any) => entry.value),
              },
            ]}
          />

          <h1 className={"text-white text-4xl font-bold text-center"}>
            {crashGame}x
          </h1>
        </>
      )}
    </div>
  );
};

export default Chart;
