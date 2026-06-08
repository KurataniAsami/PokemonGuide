'use client'

import Link from "next/link";
import { typeMeta } from "../constans/typeColor";
import { useEffect, useState } from "react";
import { PokemonList } from "../types/pokemon";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function TypeList() {
  const [type, setType] = useState<PokemonList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTypes = async () => {
      try {
        const res = await fetch(`/api/pokemonType`)
        const data = await res.json()
        setType(data.type)
      } catch(error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getTypes()
  },[])

  return (
  <div className="flex justify-center mt-5">
    <div className="grid grid-cols-4 gap-6">
      {Object.entries(typeMeta).map(([type, meta]) => (
        <Link
          key={type}
          href={`/pokemonType/${type}`}
        >
          <Card
            className="w-[180px] h-[140px] rounded-sm"
            style={{ backgroundColor: meta.color }}
          >
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-xl">{meta.label}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
)
}