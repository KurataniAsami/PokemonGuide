import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"

export const GET = async (request: NextRequest) => {
  // qが検索ワード, getで検索ワードを取り出す
  const q = request.nextUrl.searchParams.get("q");

  const pokemons = await prisma.pokemon.findMany({
    where: {
      OR: [
        {
          name: {   // nameのプロパティにq(検索ワード)が含まれているか探す
            contains: q ?? "",
            mode: "insensitive",
          },
        },
        {
          id: Number(q) || -1,
        },
      ],
    },

    // 検索結果とは別に関連結果（タイプ情報）を追加
    include: {
      types: {
        include: {
          type: true,
        },
      },
    },
  });

  return NextResponse.json({ pokemons });
};