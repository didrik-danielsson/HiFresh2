import useFormContext from "../Hooks/useFormContext.tsx";
import type { Ingredient, IngredientAmount } from "../types";
import { useState } from "react";
import {Button} from "./button.tsx";
import {Textbox} from "./Textbox.tsx";
import {DropdownLabel} from "./DropDownLabel.tsx";

const Ingredients = () => {
    const { data, setData } = useFormContext();
    const [currentName, setCurrentName] = useState("");
    const [currentAmount, setCurrentAmount] = useState(0);
    const [currentUnit, setCurrentUnit] = useState("g");



    const addIngredient = () => {
        if (!currentName.trim()) return;

        const newIngredientObj: Ingredient = {
            name: currentName.trim()
        }

        const newAmountObj:IngredientAmount = {
            amount: currentAmount,
            unit: currentUnit
        }

        setData(prev => ({
            ...prev,
            ingredients: {
                ...prev.ingredients,
                [newIngredientObj]: {
                   newAmountObj
                }
            }
        }));

        // Reset fields
        setCurrentName("");
        setCurrentAmount(0);
        setCurrentUnit("g");
    };

    const removeIngredient = (ingredientName: string) => {
        setData(prev => {
            const newIngredients = { ...prev.ingredients };
            delete newIngredients[ingredientName];
            return {
                ...prev,
                ingredients: newIngredients
            };
        });
    };

    const updateIngredient = (oldName: string, field: 'name' | 'amount' | 'unit', value: string | number) => {
        setData(prev => {
            const newIngredients = { ...prev.ingredients };

            if (field === 'name' && typeof value === 'string') {

                const ingredientData = newIngredients[oldName];
                delete newIngredients[oldName];
                newIngredients[value] = ingredientData;
            } else if (field === 'amount' && typeof value === 'number') {
                newIngredients[oldName] = {
                    ...newIngredients[oldName],
                    amount: value
                };
            } else if (field === 'unit' && typeof value === 'string') {
                newIngredients[oldName] = {
                    ...newIngredients[oldName],
                    unit: value
                };
            }

            return {
                ...prev,
                ingredients: newIngredients
            };
        });
    };

    const content = (
        <div className="ingredients-container">
            {/* Lista över tillagda ingredienser */}
            <div className="ingredients-list">
                {Object.entries(data.ingredients).map(([name, ingredientAmount]: [string, IngredientAmount]) => (
                    <div key={name} className="ingredient-row">
                        <Textbox
                            type="text"
                            value={name}
                            onChange={(e) => updateIngredient(name, 'name', e.target.value)}
                            inputText="Ingrediens"
                        />
                        <Textbox
                            type="number"
                            value={ingredientAmount.amount}
                            onChange={(e) => updateIngredient(name, 'amount', Number(e.target.value))}
                            inputText="Mängd"
                        />
                        <DropdownLabel
                            value={ingredientAmount.unit}
                            values={["g", "kg", "ml", "dl", "l", "st", "msk", "tsk", "krm"]}
                            onChange={(e) => updateIngredient(name, 'unit', e.target.value)}
                        />
                        <Button
                            type="button"
                            onClick={() => removeIngredient(name)}
                            className="remove-btn" text={"Ta bort"}/>
                    </div>
                ))}
            </div>

            {/* Formulär för att lägga till ny ingrediens */}
            <div className="add-ingredient-form">
                <Textbox
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    inputText="Ingrediens namn"
                />
                <Textbox
                    type="number"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                    inputText="Mängd"
                />
                <DropdownLabel
                    value={currentUnit}
                    values={["g", "kg", "ml", "dl", "l", "st", "msk", "tsk", "krm"]}
                    onChange={(e) => setCurrentUnit(e.target.value)}
                />
                <Button
                    type="button"
                    onClick={addIngredient}
                    className="add-btn"
                    text={ "+ Lägg till"}
                />
            </div>
        </div>
    );

    return content;
};

export default Ingredients;
