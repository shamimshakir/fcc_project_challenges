    const { useState, useEffect } = React;
    const getRecipesFromStorage = () => {
        let recipes = localStorage.getItem("recipes");
        if (recipes) {
            return JSON.parse(localStorage.getItem("recipes"));
        } else {
            return [];
        }
    };
    function RecipeBox() {
        const [recipeName, setRecipeName] = useState("");
        const [ingredients, setIngredients] = useState("");
        const [editMode, setEditMode] = useState(false);
        const [editId, setEditId] = useState(null);
        const [showAlert, setShowAlert] = useState({
            show: false,
            msg: "",
            type: ""
        });
        const [recipeList, setRecipeList] = useState(getRecipesFromStorage());

        const submitHandler = (e) => {
            e.preventDefault();
            if (recipeName && ingredients) {
                let ingredsArr = ingredients.split(",").filter((item) => item);
                const recipeObj = {
                    name: recipeName,
                    ingredients: ingredsArr
                };
                if(editMode){
                    editRecipeToList(recipeObj);
                }else {
                    addRecipeToList(recipeObj);
                }
            }else{
                showAlertMsg(true,"Recipe name and ingredients must not empty", 'danger');
            }
        };
        const addRecipeToList = (recipe) => {
            setRecipeList([...recipeList, recipe]);
            clearInputFields();
            showAlertMsg(true, "Recipe Added to List", "success");
        };
        const editRecipeToList = (recipe) => {
            let newRecipeList = recipeList.map((item,index) => {
                if(index === editId){
                    return recipe;
                }else{
                    return item;
                }
            })
            setRecipeList(newRecipeList);
            showAlertMsg(true, "Recipe Updated successfully", "success");
            clearInputFields();
            setEditMode(false);
            setEditId(null);
        };
        const clearInputFields = () => {
            setIngredients("");
            setRecipeName("");
        };
        const showAlertMsg = (show = false, msg = "", type = "") => {
            setShowAlert({ show: show, msg: msg, type: type });
        };
        const removeRecipe = (index) => {
            setRecipeList(recipeList.filter((recipe, rIndex) => rIndex !== index));
            showAlertMsg(true, "Recipe Added From List", "danger");
        };
        const editRecipe = (id) => {
            let editedItem = recipeList.find((recipe, index) => index === id);
            setEditMode(true);
            setEditId(id);
            setRecipeName(editedItem.name);
            setIngredients(editedItem.ingredients.join(','));
        };
        useEffect(() => {
            localStorage.setItem("recipes", JSON.stringify(recipeList));
        }, [recipeList]);
        useEffect(() => {
            setTimeout(() => {
                setShowAlert({ show: false, msg: "", type: "" });
            }, 5000);
        }, [showAlert]);
        return (
            <div className="recipeBox">
                {showAlert.show && (
                    <div className={`alertBox ${showAlert.type}`}>{showAlert.msg}</div>
                )}
                <div className="recipeFormsection">
                    <h2 className="sectionTitle">
                        {editMode ? "Edit Recipe" : "Add Recipe"}
                    </h2>
                    <form onSubmit={submitHandler}>
                        <div className="formGroup">
                            <label htmlFor="recipeName">Recipe Name</label>
                            <input
                                type="text"
                                name="recipeName"
                                id="recipeName"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="ingredients">Ingredients</label>
                            <span className="commaNote">write comma(,) separated items</span>
                            <textarea
                                name="ingredients"
                                id="ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="buttonSuccess" type="submit">
                            {editMode ? "Edit Recipe" : "Add Recipe"}
                        </button>
                    </form>
                </div>
                <div className="allRecipes">
                    <h2 className="sectionTitle">Recipes</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Recipe Name</th>
                            <th>Ingredients</th>
                            <th width="8%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipeList.map((recipe, index) => {
                            return (
                                <tr key={index}>
                                    <td>{recipe.name}</td>
                                    <td>
                                        {Array.isArray(recipe.ingredients) &&
                                        recipe.ingredients.map((ingreds, indexKey) => {
                                            return <li key={indexKey}>{ingreds}</li>;
                                        })}
                                    </td>
                                    <td>
                                        <div className="actionBtns">
                                            <button
                                                onClick={() => editRecipe(index)}
                                                className="editBtn"
                                            >
                                                <i className="fas fa-pen-square"></i>
                                            </button>
                                            <button
                                                onClick={() => removeRecipe(index)}
                                                className="dltBtn"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    ReactDOM.render(<RecipeBox />, document.getElementById("root"));
