import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
	const [value, setValue] = useState("");
	const [data, setData] = useState<any>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	let phonetics = "none";
	if (data) {
		phonetics = data.phonetics
			.reduce(
				(str: string, phonetic: any) => (str += phonetic.text ? phonetic.text + ", " : ""),
				""
			)
			.slice(0, -2);
	}

	useEffect(() => {
		if (value === "") return;
		const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
		fetch(url + value)
			.then((res) => res.json())
			.then((res) => setData(res[0]))
			.catch((err) => console.log(err));
	}, [value]);

	const handleClick = () => {
		setValue(inputRef.current?.value || "");
	};

	return (
		<div className="px-20 py-16 bg-green-300 min-h-screen">
			<section className="bg-[#121212] px-4 py-8 rounded-t-2xl">
				<label className="block text-lg font-bold text-white">Find Word: </label>
				<div className="flex flex-col gap-4 md:flex-row md:gap-0">
					<input ref={inputRef} className="pl-2 py-1 border-2 mr-10 w-96" />
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
			{data && (
				<motion.section
					key={data.word}
					className="px-4 py-8 bg-white rounded-b-2xl"
					initial={{ clipPath: "inset(100% 100% 100% 0)" }}
					animate={{ clipPath: "inset(100% 100% 100% 100%)" }}
					transition={{ duration: 0.8 }}>
					<div>
						<span className="font-bold">Word: </span>
						{data.word}
					</div>
					<div className="">
						<span className="font-bold">Phonetic: </span>
						{phonetics}
					</div>
					<div className="mt-4 underline font-bold text-2xl mb-2">Definitions:</div>
					<ul className="flex flex-col gap-4">
						{data.meanings.map((type: any) => {
							return (
								<div key={type.partOfSpeech}>
									<span className="font-bold">Type: </span>
									{type.partOfSpeech}
									<li className="pl-8 flex flex-col gap-2">
										{type.definitions.map((item: any) => {
											return (
												<li key={item.definition} className="list-disc text-justify">
													{item.definition}
												</li>
											);
										})}
									</li>
								</div>
							);
						})}
					</ul>
				</motion.section>
			)}
		</div>
	);
};

export default App;
