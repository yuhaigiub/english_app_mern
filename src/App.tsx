import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { findWord } from "./api/request";

const App = () => {
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const { isLoading, isError, data, error } = useQuery(value, () => findWord(value), {
		retry: false,
	});

	const handleClick = () => {
		setValue(inputRef.current?.value || "");
	};

	if (data) {
		console.log(data);
	}

	if (error) {
		console.log(error);
	}

	return (
		<div className="px-20 py-16 bg-green-300 min-h-screen">
			<section className="bg-[#121212] px-4 py-8 rounded-t-2xl">
				<label className="block text-lg font-bold text-white">Find Word: </label>
				<div className="flex flex-col gap-4 md:flex-row md:gap-0">
					<input
						ref={inputRef}
						className="pl-2 py-1 border-2 mr-10 w-full md:w-96"
						placeholder="Search for a word..."
					/>
					<span className="flex gap-4">
						<motion.button
							className="px-8 py-1 bg-green-300 hover:bg-orange-400 rounded-3xl text-lg text-black"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.25 }}
							onClick={handleClick}>
							Find
						</motion.button>
						<motion.button
							className="px-8 py-1 bg-pink-300 hover:bg-pink-400 rounded-3xl text-lg text-black"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.25 }}>
							Add
						</motion.button>
					</span>
				</div>
			</section>
			<motion.section
				key={data?.word || "unknownxxx"}
				className="px-4 py-8 bg-white rounded-b-2xl"
				initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
				animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
				transition={{ duration: 0.8 }}>
				{isLoading && value !== "" && <div className="font-bold">Loading...</div>}
				{data && (
					<>
						<div>
							<span className="font-bold">Word: </span>
							{data.word}
						</div>
						<div className="">
							<span className="font-bold">Phonetic: </span>
							{data.phonetics
								.reduce(
									(str: string, phonetic: any) =>
										(str += phonetic.text ? phonetic.text + ", " : ""),
									""
								)
								.slice(0, -2)}
						</div>
						<div className="mt-4 underline font-bold text-2xl mb-2">Definitions:</div>
						<div className="flex flex-col gap-4">
							{data.meanings.map((type: any, index: number) => {
								return (
									<ul key={type.partOfSpeech + index.toString()}>
										<span className="font-bold">Type: </span>
										{type.partOfSpeech}
										<ul className="pl-8 flex flex-col gap-2">
											{type.definitions.map((item: any) => {
												return (
													<li key={item.definition} className="list-disc text-justify">
														{item.definition}
													</li>
												);
											})}
										</ul>
									</ul>
								);
							})}
						</div>
					</>
				)}
				{isError && value !== "" && <div className="font-bold">Can't find this word!</div>}
			</motion.section>
		</div>
	);
};

export default App;
