export class result {
    id: number;
	spec: Array<number>;
    choice: string;
  }

export class result_all {
    name: string;
    age: number;
    gender: string;
    //chosen_file: string;
    chosen_test: string;
    recorded_result: result[];
}