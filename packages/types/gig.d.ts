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
  query: {
    cat?: string;
    price?: {
      $gte?: number;
      $lte?: number;
    };
    title?: {
      $regex?: string;
      $options?: string;
    };
  }
  sort: {
    createdAt?: 1 | -1;
    sales?: 1 | -1;
  }
}

interface GigFilters {
  cat?: string;
  min?: string;
  max?: string;
  title?: string;
  sort?: 'latest' | 'oldest' | 'sales';
}

