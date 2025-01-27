import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

// Step 1: Patient Information
const PatientInfo = () => {
    const { register } = useFormContext();
    return (
        <div>
            <nav className="bg-blue-500 text-white px-4 py-3">
                <ul className="flex justify-around">
                    <li>
                        <a href="/techniciandashboard" className="hover:underline">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Reports</a>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Patient Information</h2>
                <label className="block mb-2">Name:</label>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    {...register("patient_name", { required: "Name is required" })}
                />

                <label className="block mb-2">Age:</label>
                <input
                    type="number"
                    className="w-full p-2 mb-4 border rounded"
                    {...register("age", {
                        required: "Age is required",
                        min: { value: 0, message: "Age must be a positive number" },
                    })}
                />

                <label className="block mb-2">Gender:</label>
                <select
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gender", { required: "Gender is required" })}
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    );
};

// Step 2: Clinical Details
const ClinicalDetails = () => {
    const { register } = useFormContext();
    return (
        <div><nav className="bg-blue-500 text-white px-4 py-3">
            <ul className="flex justify-around">
                <li>
                    <a href="/techniciandashboard" className="hover:underline">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Reports</a>
                </li>
            </ul>
        </nav>
            <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Clinical Details</h2>
                <label className="block mb-2">Details:</label>
                <textarea
                    className="w-full p-2 mb-4 border rounded"
                    {...register("clinical_details", { required: "Details are required" })}
                />
            </div>
        </div>
    );
};

// Step 3: Gross Details
const GrossDetails = () => {
    const { register } = useFormContext();
    return (
        <div><nav className="bg-blue-500 text-white px-4 py-3">
            <ul className="flex justify-around">
                <li>
                    <a href="/techniciandashboard" className="hover:underline">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Reports</a>
                </li>
            </ul>
        </nav>
            <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gross Details</h2>
                <label className="block mb-2">Specimen Dimensions:</label>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gross.specimen_dimensions")}
                    placeholder="e.g., 55x5x3 mm"
                />

                <label className="block mb-2">Outer Surface:</label>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gross.outer_surface")}
                    placeholder="e.g., Fibrotic"
                />

                <label className="block mb-2">Gallstones:</label>
                <select
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gross.gallstones")}
                >
                    <option value="">Select</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>

                <label className="block mb-2">Mucosa:</label>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gross.mucosa")}
                    placeholder="e.g., Velvety"
                />

                <label className="block mb-2">Wall Thickness:</label>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    {...register("gross.wall_thickness")}
                    placeholder="e.g., 3 mm"
                />
            </div>
        </div>
    );
};

// Multi-Step Form Wrapper
const MultiStepForm = () => {
    const methods = useForm();
    const [step, setStep] = React.useState(1);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        alert("Form submitted successfully!");
    };

    const nextStep = () => {
        methods.trigger().then((isValid) => {
            if (isValid) setStep((prev) => prev + 1);
        });
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="max-w-lg mx-auto mt-10 p-4">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {step === 1 && <PatientInfo />}
                    {step === 2 && <ClinicalDetails />}
                    {step === 3 && <GrossDetails />}

                    <div className="flex justify-between mt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Previous
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default MultiStepForm;
