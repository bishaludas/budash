import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { getValidationErrors } from "../../../utils/FormValidator";
import RichText from "../../../utils/RichText";
import SimpleSnackbar from "../../../utils/SimpleSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Create = () => {
  const url = "/article";
  const defaultArticle = {
    title: "",
    summary: "",
    content: "",
    tags: "",
    status: "",
  };
  const [article, setArticle] = useState(defaultArticle);
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState({});
  const [toast, setToast] = useState(false);

  const addArticle = async (e) => {
    e.preventDefault();
    setProgress(true);
    let res = await axios.post(url, article);
    const { data } = res;

    if (!data.status) {
      getValidationErrors(data.errors, setError);
      setProgress(false);
      return false;
    }

    setError({});
    setArticle(defaultArticle);
    setProgress(false);
    setToast(data.message);
  };
  return (
    <div>
      <h2>Add Article</h2>
      <SimpleSnackbar toast={toast} setToast={setToast} />
      <form noValidate autoComplete="off" onSubmit={addArticle}>
        <Grid container spacing={3}>
          {/*title*/}
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              name="title"
              fullWidth
              label="Title"
              error={error.title ? true : false}
              helperText={error.title ?? ""}
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              name="summary"
              fullWidth
              label="Summary"
              error={error.summary ? true : false}
              helperText={error.summary ?? ""}
              value={article.summary}
              onChange={(e) =>
                setArticle({ ...article, summary: e.target.value })
              }
            />
          </Grid>

          {/*content*/}
          <Grid item xs={12}>
            <InputLabel
              id="rich-text"
              className="mb-2"
              error={error.content ? true : false}
            >
              Content *
            </InputLabel>
            <FormHelperText error>{error.content ?? ""}</FormHelperText>
            <RichText value={article} setValue={setArticle} />
          </Grid>

          {/* Tags */}
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              name="summary"
              fullWidth
              label="Tags"
              error={error.tags ? true : false}
              helperText={error.tags ?? ""}
              value={article.tags}
              onChange={(e) => setArticle({ ...article, tags: e.target.value })}
            />
          </Grid>

          {/*Status*/}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={error.status ? true : false}>
              <InputLabel id="demo-simple-select-label" required>
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="manager-select"
                name="manager_id"
                value={article.status}
                onChange={(e) =>
                  setArticle({ ...article, status: e.target.value })
                }
              >
                <MenuItem value="publish">Publish</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archive">Archive</MenuItem>
              </Select>
              <FormHelperText>{error.status ?? ""}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          className="mt-3"
          color="primary"
          size="small"
        >
          Submit {progress ? <CircularProgress className="progress" /> : ""}
        </Button>
      </form>
    </div>
  );
};

export default Create;
