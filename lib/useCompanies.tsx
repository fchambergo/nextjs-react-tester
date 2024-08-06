"use client"

import { useState, useEffect } from "react";
import { ICompany } from "@/models/interfaces/ICompany.interface";

function useCompanies(url: string) {

    const [companies, setCompanies] =  useState<ICompany[] | null>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            setError(null);

            try {
                const response: Response = await fetch(url);

                // Throw error if error happens when trying to do the fetch request
                if (!response.ok) {
                    throw new Error("Could not receive companies");
                }

                // Receive data of companies
                const data: ICompany[] = await response.json();
                setCompanies(data);
            } catch (error: any) {
                setError(error);
            }
        }

        fetchData()
    }, [])

    return { companies, error}
}

export default useCompanies;