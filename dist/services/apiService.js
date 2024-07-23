"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContent = exports.getPGContent = void 0;
const pg_1 = require("src/databases/pg");
const apiSchema_1 = require("src/schemas/apiSchema");
const errorHandler_1 = require("src/utils/errorHandler");
const getPGContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield (0, pg_1.query)("SELECT * FROM pages");
        console.log("rows", rows);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(rows[0]);
    }
    catch (err) {
        return (0, errorHandler_1.handleError)(res, err, "Database query error");
    }
});
exports.getPGContent = getPGContent;
const submitContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const validateBody = apiSchema_1.UserSchema.safeParse(req.body);
    if (!validateBody.success) {
        console.log(validateBody.error.message);
        return res.status(400).json({ error: "User ID and content are required" });
    }
    const { userId, content } = validateBody.data;
    const tableNames = yield (0, pg_1.query)(`
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
});
exports.submitContent = submitContent;
