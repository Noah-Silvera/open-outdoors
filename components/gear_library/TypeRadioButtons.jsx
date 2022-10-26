import { Radio } from "flowbite-react";
import classNames from "classnames";
import styles from '../../styles/GearLibrary.module.scss'

export default function TypeRadioButtons({types, onTypeSelect, selectedType}) {
  let typesWithAllOption = ["All", ...types]

  return (
    <div className='flex sm:justify-center px-4 py-5 sm:py-3 text-2xl sm:text-xl bg-tertiary-very-light sm:px-5 sm:px-5 md:px-10'>
      <div className='flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-3 w-full'>
        {typesWithAllOption.map((type, index) => {
          let idAndVal = type.replace(/ /g,"_").toLowerCase();
          let isSelected = type == "All" ?
            selectedType == null :
            selectedType == type;

          return (
            <div key={index} className={classNames(
                "py-2",
                "px-3",
                "rounded-2xl",
                "flex",
                "items-center",
                styles["min-gear-item-width"],
                {"bg-tertiary-light": isSelected}
            )}>
              <Radio
                id={idAndVal}
                name="gear_types"
                value={idAndVal}
                checked={isSelected}
                onChange={() => onTypeSelect(type == "All" ? null : type)}
              />
              <label htmlFor={idAndVal} className="ml-2 grow">{type} </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
