import React from "react";
import * as html2json from "html2json";
import parse from "html-react-parser";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoopIcon from "@material-ui/icons/Loop";
import ApiUrl from "../../ServerApi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Context = ({ value, dataV }) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const [isData, setIsData] = React.useState(false);
  const [result, setResult] = React.useState({});

  let inputEl = document.querySelectorAll("input");
  let inputElArr = Array.from(inputEl).slice(1);

  function init() {
    inputElArr.forEach((ele) => {
      const { name, value } = ele;
      setData((prev) => ({ ...prev, [name]: value ?? "1" }));
      ele.onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
      };
    });
  }
  React.useEffect(init, [isData]);

  const handleSubML1 = (event) => {
    event.preventDefault();
    fetch(`${ApiUrl}/runPython/`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        title: `${dataV && dataV?.experimentName}`,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      //console.log(response);

      return response.json();
    });
    setIsData((prev) => !prev);
    console.log(data);
  };

  const uses = value?.html.child.map((ele) => ele);
  const withoutTable =
    value?.html &&
    uses.filter((el) => {
      return el.tag !== "table";
    });

  const filterTabularIndex =
    withoutTable &&
    withoutTable.findIndex((el) => el?.child && el.child[0].text === "Tabular");

  const withoutTable1 =
    withoutTable && withoutTable.slice(0, filterTabularIndex - 1);
  //console.log(withoutTable1);

  const withoutTable2 = withoutTable && withoutTable.slice(filterTabularIndex);
  // console.log("input from withoutTable", withoutTable2);

  const onlyTables =
    value?.html &&
    uses.filter((el) => {
      return el.tag === "table";
    });

  // console.log("input from withTable", onlyTables);
  return (
    <div className={classes.root}>
      <>
        {value?.html &&
          withoutTable1.map((el) =>
            parse(value?.html && html2json.json2html(el))
          )}
      </>
      <>
        <form onSubmit={handleSubML1}>
          <>
            {value?.html &&
              withoutTable2.map((el, index1) => (
                <>
                  <div>{parse(value?.html && html2json.json2html(el))}</div>
                  <br />
                </>
              ))}
            {value?.html &&
              onlyTables.map((el1, index2) => {
                return parse(value?.html && html2json.json2html(el1));
              })}
          </>
          <button
            style={{ position: "relative", left: "50%", top: "2%" }}
            type="submit"
          >
            <LoopIcon />
          </button>
        </form>
      </>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => {
            axios.get(`${ApiUrl}/runPython`).then((res) => {
              setResult(res.data);
              console.log(result);
            });
          }}
        >
          <Typography className={classes.heading}>Result</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Result will be shown here</p>
            {Object.keys(result).map((item) => {
              return Object.keys(result[item][0]).map((i) => {
                return (
                  <p>
                    {i} : {result[item][0][i]}
                  </p>
                );
              });
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Context;
