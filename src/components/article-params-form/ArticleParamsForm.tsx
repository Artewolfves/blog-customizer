import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose'

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	setCurrentArticleState: (value: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
}

export const ArticleParamsForm = ({
	currentArticleState, 
	setCurrentArticleState
	}:ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] = useState<ArticleStateType>(currentArticleState);
	
	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({...selectArticleState, [key]: value })
	}

	useOutsideClickClose ({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((isOpen) => !isOpen)}/>
			<aside 
			ref={rootRef}
			className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}
					onSubmit={(e) => {
					e.preventDefault();
					setCurrentArticleState(selectArticleState)
					}}>
					<Text
						size={31}
						weight={800} 
						uppercase 
                        as={'h3'}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						onChange={(option)=> handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup 
						title = 'Размер шрифта'
                        name = 'fontSize'
                        options = {fontSizeOptions} 
                        selected = {selectArticleState.fontSizeOption}
                        onChange = {(option)=> handleChange('fontSizeOption', option)}
                    />
                    <Select
						title = 'Цвет шрифта'
                        selected = {selectArticleState.fontColor}
                        options = {fontColors}
                        onChange = {(option)=> handleChange('fontColor', option)}
                    />
                    <Separator/>
                    <Select
						title = 'Цвет фона'
                        selected = {selectArticleState.backgroundColor}
                        options = {backgroundColors}
                        onChange = {(option)=> handleChange('backgroundColor', option)}
                    />
                    <Select
						title = 'Ширина контента'
                        selected = {selectArticleState.contentWidth}
                        options = {contentWidthArr}
                        onChange = {(option)=> handleChange('contentWidth', option)}					
                    />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

