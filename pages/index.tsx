import { useState } from "react";


export default function Home() {
const [form, setForm] = useState({
make: "",
model: "",
year: new Date().getFullYear(),
color: "",
engineType: "",
horsepower: 100,
doors: 4,
seats: 5,
isElectric: false,
vin: ""
});
const [status, setStatus] = useState("");


function handleChange(e) {
const { name, value, type, checked } = e.target;
setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
}


async function submit(e) {
e.preventDefault();
try {
if (!window.ethereum) throw new Error('MetaMask non détecté');
await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new ethers.providers.Web3Provider(window.ethereum as any);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);


const tx = await contract.createCar(
form.make,
form.model,
Number(form.year),
form.color,
form.engineType,
Number(form.horsepower),
Number(form.doors),
Number(form.seats),
form.isElectric,
form.vin
);


setStatus('Transaction envoyée — attente de confirmation...');
await tx.wait();
setStatus('Voiture créée avec succès ! Tx: ' + tx.hash);
} catch (err) {
console.error(err);
setStatus('Erreur: ' + (err.message || err));
}
}


return (
<main className="p-6 max-w-3xl mx-auto">
<h1 className="text-2xl font-bold mb-4">Créer une voiture (10 critères)</h1>
<form onSubmit={submit} className="space-y-3">
<input name="make" placeholder="Marque" value={form.make} onChange={handleChange} />
<input name="model" placeholder="Modèle" value={form.model} onChange={handleChange} />
<input name="year" type="number" name="year" value={form.year} onChange={handleChange} />
<input name="color" placeholder="Couleur" value={form.color} onChange={handleChange} />
<input name="engineType" placeholder="Type moteur" value={form.engineType} onChange={handleChange} />
<input name="horsepower" type="number" value={form.horsepower} onChange={handleChange} />
<input name="doors" type="number" value={form.doors} onChange={handleChange} />
<input name="seats" type="number" value={form.seats} onChange={handleChange} />
<label>
Électrique ? <input name="isElectric" type="checkbox" checked={form.isElectric} onChange={handleChange} />
</label>
<input name="vin" placeholder="VIN" value={form.vin} onChange={handleChange} />
<button type="submit">Créer la voiture</button>
</form>


<p className="mt-4">{status}</p>


</main>
);
}
