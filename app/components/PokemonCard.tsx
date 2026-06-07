import Link from "next/link"
import Image from "next/image"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"

import { PokemonList } from "../types/pokemon"
import { PokemonType } from "../types/pokemonType"
import { typeMeta } from "../constans/typeColor"

type Props = {
  pokemon: PokemonList
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 300,
        backgroundColor: '#ffffff',
        marginTop: '20px'
      }}
    >
      <CardContent>
        <Link href={`/data-list/${pokemon.id}`}>
          <div className="mb-5">
            <div>No:{pokemon.id}</div>

            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              width={120}
              height={120}
              className="mx-auto"
            />

            <p className="text-center">{pokemon.name}</p>
          </div>

          <div className="flex justify-center gap-3">
            {pokemon.types.map((t) => {
              const type = t.type.name as PokemonType

              return (
                <Button
                  key={t.type.id}
                  variant="contained"
                  disabled
                  sx={{
                    backgroundColor: typeMeta[type].color,
                    color: '#00001C',

                    '&.Mui-disabled': {
                      backgroundColor: typeMeta[type].color,
                      color: '#00001C',
                    },
                  }}
                >
                  {typeMeta[type].label}
                </Button>
              )
            })}
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}