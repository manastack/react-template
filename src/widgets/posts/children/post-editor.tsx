import {
  ChangeEvent,
  FC,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'
import { useQueryClient } from '@tanstack/react-query'

import { PostsItemModel, usePostUpdating } from '@entities/post'
import { ButtonSymbol } from '@shared/ui/button-symbol'

import {
  StyledPostEditor,
  StyledPostEditorBody,
  StyledPostEditorTitle,
  StyledToolbar,
} from './post-editor.style'

function useInput<T>(
  initialValue: T,
): [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [value, setValue] = useState<T>(initialValue)
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValue(event.target.value as T)

  return [value, onChange]
}

type Props = PostsItemModel & {
  closePostEditor: () => void
}

const PostEditor: FC<PropsWithEmotionNaming<Props>> = ({
  body,
  closePostEditor,
  id,
  setClassName,
  title,
  userId,
}) => {
  const [titleInputValue, handleTitleInputValueChange] = useInput<
    PostsItemModel['title']
  >(title)

  const [bodyInputValue, handleBodyInputValueChange] = useInput<
    PostsItemModel['body']
  >(body)

  const titleInput: LegacyRef<HTMLInputElement> | undefined = useRef(null)

  const bodyInput: LegacyRef<HTMLTextAreaElement> | undefined = useRef(null)

  const { isLoading, mutate: updatePost } = usePostUpdating({ id })

  const queryClient = useQueryClient()

  const handleSave = useCallback(async () => {
    updatePost({ body: bodyInputValue, id, title: titleInputValue, userId })
    await queryClient.invalidateQueries(['posts'])
    closePostEditor()
  }, [
    bodyInputValue,
    closePostEditor,
    id,
    queryClient,
    titleInputValue,
    updatePost,
    userId,
  ])

  useEffect(() => {
    titleInput.current?.focus()
  }, [])

  return (
    <StyledPostEditor className={setClassName('PostEditor')}>
      <StyledPostEditorTitle
        className={setClassName('PostEditorTitle', 'mb-2 text-3xl')}
        onChange={handleTitleInputValueChange}
        placeholder="Title of the post"
        ref={titleInput}
        value={titleInputValue}
      />
      <StyledPostEditorBody
        className={setClassName('PostEditorBody', 'mb-2 text-3xl')}
        onChange={handleBodyInputValueChange}
        placeholder="Body of the post"
        ref={bodyInput}
        rows={3}
        value={bodyInputValue}
        wrap="off"
      />
      <StyledToolbar className={setClassName('Toolbar')}>
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          handleClick={closePostEditor}
          label="cancel"
          renderLogId={`post-editor.cancel.${id}`}
        />
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          disabled={isLoading || !titleInputValue || !bodyInputValue}
          handleClick={handleSave}
          label="save"
          renderLogId={`post-editor.save.${id}`}
        />
      </StyledToolbar>
    </StyledPostEditor>
  )
}

export default withEmotionNaming(withRenderLog(PostEditor))
