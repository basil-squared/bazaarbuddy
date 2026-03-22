
import { NextResponse, NextRequest } from 'next/server';
import { writeRedisData } from '@/app/serverHelpers/redisHelper';

export async function POST(req: NextRequest) {
    // obvious safety move so someone cant crash the server with junk requests
    const authHeader = req.headers.get('authorization');
    const secret = process.env.CRON_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // do the thing
        await writeRedisData();

        return NextResponse.json(
            { message: "Cache Updated Successfully" },
            { status: 200 }
        );
    } catch (error) {
        // log error in case something happens
        console.error("Redis Update Failure:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}