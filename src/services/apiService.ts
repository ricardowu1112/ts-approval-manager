import { Request, Response } from "express";
import { getTableNames, query } from "src/databases/pg";
import { UserSchema } from "src/schemas/apiSchema";
import { handleError } from "src/utils/errorHandler";

export const getPGContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  /* #swagger.responses[200] = {
    description: 'Return the detail of table "page"',
    schema: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                required: true,
                example: 1
            },
            path: {
                type: 'string',
                required: true,
                example: 'home'
            },
            hash: {
                type: 'string',
                required: true,
                example: 'b29b5d2ce62e55412776ab98f05631e0aa96597b'
            },
            title: {
                type: 'string',
                required: true,
                example: 'Untitled Page'
            },
            description: {
                type: 'string',
                required: true,
                example: ''
            },
            isPrivate: {
                type: 'boolean',
                required: true,
                example: false
            },
            isPublished: {
                type: 'boolean',
                required: true,
                example: true
            },
            privateNS: {
                type: 'string',
                nullable: true,
                example: null
            },
            publishStartDate: {
                type: 'string',
                required: true,
                format: 'date-time',
                example: '2024-07-22T09:16:42.186Z'
            },
            publishEndDate: {
                type: 'string',
                required: true,
                format: 'date-time',
                example: '2024-07-22T09:16:42.186Z'
            },
            tags: {
                type: 'array',
                required: true,
                items: {
                    type: 'string'
                }
            },
            content: {
                type: 'string',
                required: true,
                example: '# Header\nYour content here'
            },
            render: {
                type: 'string',
                example: '<h1 class="toc-header" id="header"><a href="#header" class="toc-anchor">¶</a> Header</h1>\n<p>Your content here</p>\n'
            },
            toc: {
                type: 'string',
                example: 'Header'
            },
            contentType: {
                type: 'string',
                required: true,
                example: 'markdown'
            },
            createdAt: {
                type: 'string',
                required: true,
                format: 'date-time',
                example: '2024-07-22T09:16:42.186Z'
            },
            updatedAt: {
                type: 'string',
                required: true,
                format: 'date-time',
                example: '2024-07-22T09:16:42.186Z'
            },
            editor: {
                type: 'string',
                required: true,
                example: 'markdown'
            },
            locale: {
                type: 'string',
                required: true,
                example: 'en'
            },
            scriptCss: {
                type: 'string',
                nullable: true,
                example: ''
            },
            scriptJs: {
                type: 'string',
                nullable: true,
                example: ''
            },
            authorId: {
                type: 'integer',
                required: true,
                example: 1
            },
            authorName: {
                type: 'string',
                required: true,
                example: 'Author Name'
            },
            authorEmail: {
                type: 'string',
                required: true,
                example: 'author@example.com'
            },
            creatorId: {
                type: 'integer',
                required: true,
                example: 1
            },
            creatorName: {
                type: 'string',
                required: true,
                example: 'Creator Name'
            },
            creatorEmail: {
                type: 'string',
                required: true,
                example: 'creator@example.com'
            }
        },
        NotRequired: [
            'privateNS',
            'render',
            'toc',
            'scriptCss',
            'scriptJs'
        ]
    }
} */

  try {
    console.log("pg");
    const { rows } = await query("SELECT * FROM pages");
    console.log("rows", rows);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    return handleError(res, err, "Database query error");
  }
};

export const submitContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            type: 'number',
            description: 'Some description...',
            schema: {
                $userId: '4325232',
                $content: 'fdsgfdbsjgbsjh',
                about: 'dwaf'
            }
    } */

  console.log("pgroute");
  const validateBody = UserSchema.safeParse(req.body);
  if (!validateBody.success) {
    console.log(validateBody.error.message);
    return res.status(400).json({ error: "User ID and content are required" });
  }

  const { userId, content } = validateBody.data;
  const tableNames = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `);

  console.log("tableNames", tableNames);

  // Simulate a successful submission
  const responseMessage = {
    message: `Content submitted`,
    content: tableNames,
  };

  return res.status(200).json(responseMessage);
};
