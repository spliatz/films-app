import { Film, RateEnum, PopularityEnum } from '../../types';

export function searchFilter(
    Rate: string,
    Popularity: string,
    Genre: number,
    filmList: Film[],
): Film[] | null {
    const response = filmList
        .filter((item) => {
            return Rate === RateEnum.HIGH ? item.vote_average > 5 : item.vote_average <= 5;
        })
        .filter((item) => {
            return Popularity === PopularityEnum.HIGH
                ? item.popularity > 100 && item.vote_count > 200
                : item.popularity <= 100 && item.vote_count <= 200;
        })
        .filter((item) => {
            return item.genre_ids.includes(Genre);
        });

    return response.length > 0 ? response : null;
}
