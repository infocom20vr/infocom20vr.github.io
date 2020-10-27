export class result {
    id: number;
	spec: Array<number>;
	rate: number;
    choice: string;
  }

export class result_all {
    name: string;
    age: number;
    gender: string;
	finish_time: string;
    recorded_result: result[];
}