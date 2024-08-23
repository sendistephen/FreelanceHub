interface IGig{
    _id: string;
    userId: string;
    title: string;
    desc: string;
    totalStars?: number;
    starNumber?: number;
    cat: string;
    price: number;
    cover: string;
    images?: string[];
    shortTitle: string;
    shortDesc: string;
    deliveryTime: number;
    revisionNumber: number;
    features?: string[];
    sales: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CreateGigRequest{
    title: string;
    desc: string;
    totalStars?: number;
    starNumber?: number;
    cat: string;
    price: number;
    cover: string;
    images?: string[];
    shortTitle: string;
    shortDesc: string;
    deliveryTime: number;
    revisionNumber: number;
    features?: string[];
}

interface IGigsQuery{
    sort?:string;
    [key:string]:any;
}

interface GigQuery {
  query: Record<string, any>;
  sort: Record<string, 1 | -1>;
}

interface GigFilters {
  cat?: string;
  min?: string;
  max?: string;
  title?: string;
  sort?: 'latest' | 'oldest' | 'sales';
}

