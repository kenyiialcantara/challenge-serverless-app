import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { PaginationDto } from "../dto/pagination.dto";
import { CustomPeopleDto } from "./dto/custom.people.dto";
import { v4 as uuidV4 } from "uuid";
import { formatItem } from "../../utils/format";

export class CustomPeopleService {
  USERS_TABLE = process.env.USERS_TABLE;
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient();
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  public async getAllPeople(paginationDto: PaginationDto) {
    const params = {
      TableName: this.USERS_TABLE,
      Limit: paginationDto.limit,
    };

    if (paginationDto.lastKey) {
      params["ExclusiveStartKey"] = paginationDto.lastKey;
    }

    try {
      const command = new ScanCommand(params);
      const { Items, LastEvaluatedKey } = await this.client.send(command);
      return {
        data: Items?.map((item) => formatItem(item)),
        meta: {
          lastKey: LastEvaluatedKey || null,
        },
      };
    } catch (error) {
      throw new Error("Error pagination get people");
    }
  }

  public async getCustomPeopleById(id: string) {
    try {
      const params = {
        TableName: this.USERS_TABLE,
        Key: {
          peopleId: id,
        },
      };
      const command = new GetCommand(params);
      const { Item } = await this.docClient.send(command);
      if (Item) {
        return {
          ...Item,
        };
      } else {
        throw new Error(`User with id ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Error get people by id ${id}`);
    }
  }

  public async saveCustomPeople(customPeopleDto: CustomPeopleDto) {
    const data: CustomPeopleDto = {
      peopleId: uuidV4(),
      ...customPeopleDto,
    };

    const params = {
      TableName: this.USERS_TABLE,
      Item: data,
    };

    try {
      const command = new PutCommand(params);
      await this.docClient.send(command);
      return data;
    } catch (error) {
      throw new Error("Error when saving a user");
    }
  }
}
