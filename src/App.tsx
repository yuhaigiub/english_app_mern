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

	// if (data) {
	// 	console.log(data);
	// }

	// if (error) {
	// 	console.log(error);
	// }

	return (
		<div className="sm:px-20 py-16 bg-green-300 min-h-screen text-sm sm:text-base font-open">
			<section className="bg-[#121212] px-2 sm:px-4 py-8 sm:rounded-t-2xl">
				<label className="block sm:text-lg font-bold text-white">Find Word: </label>
				<div className="flex flex-col gap-4 md:flex-row md:gap-0">
					<input
						ref={inputRef}
						className="pl-2 py-1 border-0 w-full sm:mr-10 sm:w-96 sm:text-base"
						placeholder="Search for a word..."
						onKeyDownCapture={(e) => {
							if (e.key === "Enter") {
								handleClick();
							}
						}}
					/>
					<span className="flex gap-4">
						<motion.button
							className="px-6 md:px-8 py-1 bg-green-300 hover:bg-green-400 rounded-3xl sm:text-lg text-black"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.25 }}
							onClick={handleClick}>
							Find
						</motion.button>
						<motion.button
							className="px-6 md:px-8 py-1 bg-pink-300 hover:bg-pink-400 rounded-3xl sm:text-lg text-black"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.25 }}
							type="button">
							Add
						</motion.button>
					</span>
				</div>
			</section>
			<motion.section
				key={data?.word || "unknownxxx"}
				className="px-2 sm:px-4 py-8 bg-white sm:rounded-b-2xl"
				initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
				animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
				transition={{ duration: 0.8 }}>
				{isLoading && value !== "" && <div className="font-bold">Loading...</div>}
				{data && (
					<>
						<div className="text-2xl md:text-4xl font-source">
							<span className="underline">Word:</span>
							<span className="text-green-500 font-bold"> {data.word.toUpperCase()}</span>
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
						<div className="mt-4 underline text-lg sm:text-2xl mb-2 font-source">Definitions:</div>
						<div className="flex flex-col gap-4">
							{data.meanings.map((type: any, index: number) => {
								return (
									<ul key={type.partOfSpeech + index.toString()}>
										<span className="font-bold">Type: </span>
										<span
											style={{ color: typeColor(type.partOfSpeech) }}
											className="md:text-2xl font-source">
											{type.partOfSpeech}
										</span>

										<ul className="pl-4 md:pl-8 flex flex-col gap-4 sm:gap-2 divide-y-2">
											{type.definitions.map((item: any) => {
												return (
													<li
														key={item.definition}
														className="list-disc font-source text-justify text-sm] md:text-base">
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

const typeColor = (type: string) => {
	switch (type) {
		case "noun":
			return "red";
		case "verb":
			return "blue";
		case "adjective":
			return "green";
		default:
			return "black";
	}
};
