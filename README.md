# Task Tracker CLI by RoadMap

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh).

## Installation

To use TaskTrackerCLI, first, clone the repository and then install the necessary dependencies.

```cli
git clone https://github.com/batugkocak/Task-Tracker-by-roadmap.sh
cd task-tracker-cli
yarn install
```

## Usage

**Available commands:**

- **add `<title>` `<description>`**  
  Add a new task with the given title and description.

- **update `<id>` `<title>` `<description>`**  
  Update an existing task’s title and description by its ID.

- **mark `<id>` `<status:true|false>`**  
  Change the completion status of the task identified by ID.

- **list `[completed:true|false] [withDeleted:true|false]`**  
  List all tasks. Optional filters can be applied:

  - **completed:** Filter tasks by their completion status.
  - **withDeleted:** Include deleted tasks in the listing.

- **delete `<id>`**  
  Delete a task by ID.

- **help**  
  Display all commands.

- **exit**  
  Exit the CLI application.
